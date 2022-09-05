// writer : 최강현
import styled from "styled-components";

export const CountBox = styled.div`
  margin: 30px;
  font-size: 32px;
  font-weight: bold;

  span {
    color: #e6007e;
  }

  .goHome {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .fixKeyword {
    margin-top: 5px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      &:hover {
        color: #cc0070;
        text-decoration: underline;
        cursor: pointer;
      }
      &:active {
        color: #a10059;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;
