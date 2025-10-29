import { createPortal } from "react-dom";
import css from "./Loader.module.css"
import { FadeLoader } from "react-spinners";
const Loader = () => {
  return createPortal(
    <div className={css.loaderWrap}>
      <FadeLoader color="#0d6efd" />
    </div>, document.body
  )
}

export default Loader
