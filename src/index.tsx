import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Query, QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
)
