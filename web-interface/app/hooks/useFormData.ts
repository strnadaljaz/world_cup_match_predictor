import { useState } from "react";
import { formDataType } from "../lib/types";

export const useFormData = () => {
    const [formData, setFormData] = useState<formDataType>({
        homeCountry: "",
        awayCountry: "",
        neutral: false,
    });

    return { formData, setFormData };
}