"use client";
import { formDataType } from "../lib/types";
import { NeutralInputType } from "../lib/types";

const NeutralInput = ({ formData, setFormData }: NeutralInputType) => {
    return (
        <div className="space-y-2">
            <label
                htmlFor="answer"
                className="text-sm font-medium text-slate-200"
            >
                Neutral ground
            </label>
            <select
                id="answer"
                value={String(formData.neutral)}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        neutral: e.target.value === "true",
                    })
                }
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
    );
}

export default NeutralInput;