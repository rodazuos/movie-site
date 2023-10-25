import classNames from "classnames";
import upperCaseFisrChar from "../../utils/upperCaseFirstChar";
import styles from "../../../styles/Text.module.css";
import textFormatter from "../../../styles/TextFormatter.module.css";

const Text = (props) => {
  const {
    children,
    color,
    size,
    weight,
    align,
    className: classNameProp,
    ...rest
  } = props;

  const className = classNames(
    styles.Text,
    {
      [styles[color]]: color,
      [styles[size]]: size,
      [textFormatter[`align${upperCaseFisrChar(align)}`]]: align,
      [styles[weight]]: weight,
    },
    classNameProp
  );

  return (
    <p className={className} {...rest}>
      {children}
    </p>
  );
};

export default Text;
