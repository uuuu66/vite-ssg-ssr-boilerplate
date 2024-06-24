import { forwardRef, PropsWithChildren } from "react";
import Responsable from "../components/Responsable";
import SectionContainer from "../components/SectionContainer";

const ProductSection = forwardRef<HTMLDivElement, PropsWithChildren>(
  (_, ref) => {
    return (
      <SectionContainer ref={ref}>
        <Responsable
          pc={<div>ss</div>}
          tablet={<div>ss</div>}
          mobile={<div>ss</div>}
        />
      </SectionContainer>
    );
  }
);
export default ProductSection;
