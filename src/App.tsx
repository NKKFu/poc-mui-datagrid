import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { queryClient } from './configs/query.config';
import { GlobalStyles } from './configs/styled.config';
import { Contexts } from './contexts';
import { Home } from './pages/Home';
import { QueryClientProvider } from '@tanstack/react-query';
import { DeletePosts } from './pages/DeletePosts';

export const App = () => {
    return <Contexts>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/delete-posts" element={<DeletePosts />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </Contexts >
}
