import Image, {ImageProps} from "next/image";
import React from "react";

//styles
import * as Styled from './styles';

interface Props extends ImageProps {
}

const NextImage = (props: Props): JSX.Element => {
  return (
    <Styled.Container className={props.className}>
      <Image alt="" layout="fill" {...props}/>
    </Styled.Container>
  )
}

export default NextImage;