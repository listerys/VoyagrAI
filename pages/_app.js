import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProjectProvider } from '@/contexts/ProjectContext'
import { SimulationProvider } from '@/contexts/SimulationContext'
import { Toaster } from 'sonner'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <ProjectProvider>
          <SimulationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Toaster position="top-right" />
          </SimulationProvider>
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
