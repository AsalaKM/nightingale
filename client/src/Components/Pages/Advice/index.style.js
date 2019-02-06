import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 2rem;
  .Collapsible {
    border-top: 1px solid #cccc;
  }

  .Collapsible__trigger {
    position: relative;
    cursor: pointer;
    display: flex;
    padding: 1rem;
  }

  .is-closed {
    :after {
      font-family: "Font Awesome 5 Free";
      content: "\f107";
      position: absolute;
      right: 1rem;
      top: 1rem;
      display: block;
      color: #cccc;
      font-weight: 900;
      font-size: 1.5rem;
      transition: transform 300ms ease;
    }
  }

  .is-open {
    :after {
      font-family: "Font Awesome 5 Free";
      content: "\f107";
      position: absolute;
      right: 1rem;
      top: 1rem;
      display: block;
      color: #cccc;
      font-weight: 900;
      font-size: 1.5rem;
      transition: transform 300ms ease;
      transform: rotateZ(180deg);
    }
  }

  .Collapsible__contentInner {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const Article = styled.div.attrs({
  className: "flex items-center justify-center"
})`
  margin-bottom: 1rem;
  border-bottom: 1px solid #edeeee;
  padding: 1rem 1rem 0.5rem 1rem;
  transition: all 300ms ease;

  a {
    text-decoration: none;
    cursor: pointer;
    color: #925de5;
  }

  :hover {
    margin-left: 1.5rem;
  }
`;
