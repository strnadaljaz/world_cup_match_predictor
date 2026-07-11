import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import "@testing-library/jest-dom"

global.fetch = jest.fn();

describe('Input test', () => {
    const user = userEvent.setup();

    test("home team selector updates when user selects a team", async () => {
        render(<Home />);

        const home_input = screen.getByLabelText("Home country");

        await user.type(home_input, 'Argentina');

        expect(home_input.value).toBe('Argentina');
    });

    test("away team selector updates when user selects a team", async () => {
        render(<Home />);

        const away_input = screen.getByLabelText("Away country");

        await user.type(away_input, 'Brazil');

        expect(away_input.value).toBe('Brazil');
    });

    test('neutral ground selector updates when user sets it', async () => {
        render(<Home />);

        const neutral_select = screen.getByLabelText('Neutral ground');

        await user.selectOptions(neutral_select, 'Yes');

        expect(neutral_select.value).toBe('true');
    });
});

describe("button test", () => {
    const user = userEvent.setup();

    test('does button trigger correct post request', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        });

        render(<Home />);

        const home_select = screen.getByLabelText("Home country");
        await user.type(home_select, 'Argentina');

        const away_select = screen.getByLabelText("Away country");
        await user.type(away_select, 'Brazil');

        const neutral_select = screen.getByLabelText('Neutral ground');
        await user.selectOptions(neutral_select, 'Yes');

        const button = screen.getByText("Predict match");

        fireEvent.click(button);

        const params = {
            home_team: home_select.value.toLowerCase(),
            away_team: away_select.value.toLowerCase(),
            neutral: neutral_select.value == "true",
        };

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "https://strnadserver.pike-solfege.ts.net/api/probabilities",
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params)
                })
            )
        });
    });
});

jest.mock("chart.js/auto", () => ({
    Chart: jest.fn().mockImplementation(() => ({
        data: {
            datasets: [{ data: [] }],
        },
        update: jest.fn(),
        destroy: jest.fn(),
    })),
}));



describe("Charts test", () => {
    const user = userEvent.setup();

    test("Charts load", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                home_win: 0.5,
                draw: 0.2,
                away_win: 0.3
            }),
        });

        render(<Home />);

        const home_select = screen.getByLabelText("Home country");
        await user.type(home_select, 'Argentina');

        const away_select = screen.getByLabelText("Away country");
        await user.type(away_select, 'Brazil');

        const neutral_select = screen.getByLabelText('Neutral ground');
        await user.selectOptions(neutral_select, 'Yes');

        await user.click(screen.getByText("Predict match"));

        await waitFor(() => {
            expect(document.getElementById("home_win_chart")).toBeInTheDocument();
            expect(document.getElementById("draw_chart")).toBeInTheDocument();
            expect(document.getElementById("away_win_chart")).toBeInTheDocument();
        });
    });
});
