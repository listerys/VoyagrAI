'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Budget } from '@/types';
import { formatCurrency } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Green
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#8884D8', // Purple
  '#FF6B6B', // Red
  '#4CAF50', // Dark Green
  '#9C27B0', // Violet
  '#E91E63', // Pink
  '#3F51B5', // Indigo
];

const CATEGORY_ICONS: Record<string, string> = {
  accommodation: '🏨',
  food: '🍽️',
  activities: '🎭',
  transportation: '🚌',
  miscellaneous: '🛍️',
  shopping: '🛒',
  entertainment: '🎬',
  insurance: '🔒',
  tours: '🧭',
  nightlife: '🌃',
};

// Optional helper if you need to remove weird symbols from server
function removeMarkdown(text: string) {
  return text
    .replace(/\*+/g, '')
    .replace(/#+/g, '')
    .trim();
}

interface BudgetBreakdownProps {
  budget: Budget;
  duration: number;
  travelers: number;
}

export function BudgetBreakdown({ budget, duration, travelers = 1 }: BudgetBreakdownProps) {
  const [activeTab, setActiveTab] = useState('breakdown');

  if (!budget || !budget.breakdown) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Budget Breakdown</CardTitle>
          <CardDescription>
            Budget information is not available or still being loaded.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const chartData = Object.entries(budget.breakdown).map(([cat, val], idx) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' '),
    value: val,
    color: COLORS[idx % COLORS.length],
    icon: CATEGORY_ICONS[cat.toLowerCase()] || '📊',
  }));

  const perPersonTotal = budget.total / travelers;
  const perPersonPerDay = perPersonTotal / duration;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Budget Breakdown</CardTitle>
        <CardDescription>
          Total budget: {formatCurrency(budget.total, budget.currency)} for {duration} days ({travelers} {travelers === 1 ? 'person' : 'people'})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="breakdown" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(budget.total, budget.currency)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Per Person</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(perPersonTotal, budget.currency)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Per Day/Person</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(perPersonPerDay, budget.currency)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium mb-2">Category Breakdown</h3>
              {chartData.map(item => {
                const percentage = (item.value / budget.total) * 100;
                const perPersonValue = item.value / travelers;
                const perDayValue = item.value / duration;
                const perPersonPerDayValue = perPersonValue / duration;
                
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold">
                          {formatCurrency(item.value, budget.currency)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Per person: {formatCurrency(perPersonValue, budget.currency)}</span>
                      <span>Per day: {formatCurrency(perDayValue, budget.currency)}</span>
                      <span>Per day/person: {formatCurrency(perPersonPerDayValue, budget.currency)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [formatCurrency(val as number, budget.currency), 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
