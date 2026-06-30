import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';

describe('Input test', () => {
    const user = userEvent.setup();
    
    test("home team selector updates when user selects a team", async () => {
        render(<Home />);

        const home_select = screen.getByLabelText("Home country");

        await user.selectOptions(home_select, 'Argentina');

        expect(home_select.value).toBe('Argentina');
    });

    test("away team selector updates when user selects a team", async () => {
        render(<Home />);
   
        const away_select = screen.getByLabelText("Away country");

        await user.selectOptions(away_select, 'Brazil');

        expect(away_select.value).toBe('Brazil');
    });

    test('neutral ground selector updates when user sets it', async () => {
        render(<Home />);

        const neutral_select = screen.getByLabelText('Neutral ground');

        await user.selectOptions(neutral_select, 'Yes');

        expect(neutral_select.value).toBe('true');
    })
});
