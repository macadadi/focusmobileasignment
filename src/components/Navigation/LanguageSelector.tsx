import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("en");

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <div>
        <label className="mr10">
          <input
            type="radio"
            value="en"
            name="language"
            checked={selectedLang === "en"}
            onChange={changeLanguage}
          />{" "}
          English
        </label>
        <label>
          <input
            type="radio"
            value="ksw"
            name="language"
            checked={selectedLang === "ksw"}
            onChange={changeLanguage}
          />{" "}
          Kiswahili
        </label>
      </div>
    </div>
  );
};

export default LangSelector;
