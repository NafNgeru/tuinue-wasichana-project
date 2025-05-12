import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { vi } from "vitest";



const mockCharities = [
  {
    id: 1,
    full_name: 'Hope Foundation',
    description: 'Supporting children in need.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    full_name: 'Charity B',
    description: '',
    image: 'https://via.placeholder.com/150',
  },
];

const mockStore = configureStore([thunk]);

beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockCharities),
        })
    );
    localStorage.clear();
});

afterEach(() => {
    vi.clearAllMocks();
});

function renderWithProviders() {
    const store = mockStore({
        donor: { donations: [], charities: mockCharities },
    });

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/donor/1']}>
                <Routes>
                    <Route path="/donor/:id" element={<DonorDashboard />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
}

describe('DonorDashboard', () => {
    test('displays welcome message and navigation links', async () => {
        renderWithProviders();

        expect(await screen.findByText(/choose a charity to support/i)).toBeInTheDocument();
        expect(screen.getByText(/donation history/i)).toBeInTheDocument();
        expect(screen.getByText(/beneficiary stories/i)).toBeInTheDocument();
    });

    test('fetches and displays charity cards', async () => {
        renderWithProviders();

        expect(await screen.findByText('Hope Foundation')).toBeInTheDocument();
        expect(screen.getByText('Charity B')).toBeInTheDocument();
    });

    test('switches to favorites tab and shows empty state', async () => {
        renderWithProviders();

        await waitFor(() => screen.getByText('Hope Foundation'));

        const favTab = screen.getByRole('button', { name: /favorites/i });
        fireEvent.click(favTab);

        expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument();
    });

    test('adds and removes charity from favorites', async () => {
        renderWithProviders();

        const heartButtons = await screen.findAllByRole('button', { name: '' });
        const firstHeartButton = heartButtons[2]; // Adjust based on button order

        fireEvent.click(firstHeartButton);

        const favTab = screen.getByRole('button', { name: /favorites/i });
        fireEvent.click(favTab);

        expect(await screen.findByText('Hope Foundation')).toBeInTheDocument();

        // remove from favorites
        const filledHeart = screen.getAllByRole('button', { name: '' });
        fireEvent.click(filledHeart);

        expect(screen.queryByText('Hope Foundation')).not.toBeInTheDocument();
        expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument();
    });

    test('shows loading state', async () => {
        renderWithProviders();
        expect(screen.getByText(/loading charities/i)).toBeInTheDocument();
        await screen.findByText('Hope Foundation');
    });

    test('shows error message on fetch failure', async () => {
        fetch.mockImplementationOnce(() => Promise.reject('API failure'));

        renderWithProviders();
        expect(await screen.findByText(/error loading charities/i)).toBeInTheDocument();
    });
});