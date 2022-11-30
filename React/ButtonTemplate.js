import React from 'react';
import styled from 'styled-components';

const ButtonTemplateBlock = styled.button`
  width: 160px;
  height: 160px;

  color : black;
  font-size: 30px;
  font-weight: 800;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  border-style:solid;
  border-color:#20c997;
  border-width: 3px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

//   margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  margin-top:150px;
  margin-bottom: 20x;
  margin-left: 30px;
  margin-right:20px;
  display: flex;
  flex-direction: row;

  &:active,
  &:hover,
  &:focus {
    color : white;
    background: var(--button-hover-bg-color, #20c997);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #20c997);
  }
`;

function ButtonTemplate({ children }) {
  return <ButtonTemplateBlock>{children}</ButtonTemplateBlock>;
}

export default ButtonTemplate;