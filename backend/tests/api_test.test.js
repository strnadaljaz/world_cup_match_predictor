describe('Match predictor API', () => {
    test('returns probabilities', async () => {
        const URL = "https://strnadserver.pike-solfege.ts.net/api/probabilities";

        const params = {
            home_team: "argentina",
            away_team: "brazil",
            neutral: false,
        };

        const response = await fetch(
            URL, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json"
            }
        });

        expect(response.status).toBe(200);

        const data = await response.json();

        expect(data).toHaveProperty("home_win");
        expect(data).toHaveProperty("away_win");
        expect(data).toHaveProperty("draw");

        expect(typeof data["home_win"]).toBe("number");
        expect(typeof data["away_win"]).toBe("number");
        expect(typeof data["draw"]).toBe("number");
    });
});
