import styled, { css } from 'styled-components';

export const Inner = styled.span<{ checked?: boolean; disabled?: boolean }>`
  position: relative;
  top: 0;
  left: 0;
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 1;
  direction: ltr;
  background-color: black;
  border: 2px solid #36454f;
  border-radius: 2px;
  border-collapse: separate;
  transition: all 0.3s;

  ${props =>
    props.checked &&
    css`
      background-color: ${props => props.theme.colors.lightishBlue};
      border-color: ${props => props.theme.colors.lightishBlue};
    `}

  ${props =>
    props.disabled &&
    css`
      background-color: ${props => props.theme.colors.charcoalGreyTwo};
      border-color: ${props => props.theme.colors.charcoalGreyTwo};
    `}

  &::after {
    position: absolute;
    top: 5px;
    left: 2px;
    display: table;
    width: 5.71428571px;
    height: 9.14285714px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(0) translate(-50%, -50%);
    opacity: 0;
    transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
    content: ' ';
  }

  ${props =>
    props.checked &&
    css`
      &::after {
        position: absolute;
        display: table;
        border: 2px solid ${props.disabled ? props.theme.colors.steel : '#fff'};
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        opacity: 1;
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        content: ' ';
      }
    `}
`;

export const Checkbox = styled.span<{ checked?: boolean; disabled?: boolean }>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  line-height: 1;
  list-style: none;
  font-variant-numeric: tabular-nums;
  position: relative;
  top: 0.2em;
  white-space: nowrap;
  outline: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  ${props =>
    !props.disabled &&
    css`
      &:hover {
        ${Inner} {
          border-color: ${!props.checked
            ? '#2C3539'
            : '#2C3539'};
        }
      }
    `}
`;

export const Input = styled.input<{ disabled?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: 0;
  box-sizing: border-box;
  padding: 0;
  touch-action: manipulation;
`;
