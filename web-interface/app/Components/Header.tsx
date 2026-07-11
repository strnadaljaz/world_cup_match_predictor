"use client";

const Header = () => {
    return (
        <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                AI match predictor
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                International match predictor
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Tune the match inputs now. Prediction charts and output
                will sit below this section later.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Model accuracy: <u>59.99%</u>
            </p>
        </div>
    );
}

export default Header;