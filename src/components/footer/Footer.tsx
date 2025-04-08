import { useTranslation } from "react-i18next";
import "./footer.css";

const Footer = () => {
  const { t: rawT } = useTranslation('translation');
    const t = rawT as (key: string, options?: any) => any;

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">RenkAI</div>

        <ul>
          <li>{t("footer.terms")}</li>
          <li>{t("footer.cookie")}</li>
          <li>{t("footer.third")}</li>
        </ul>

        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
