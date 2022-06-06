import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const About = () => {

  

  return (
    <MainWrapper>
      <div>
        <h1>About</h1>
      </div>

      <Note>
        <p>
          This app is based on the CBT, cognitive behavioral therapy, model ABC where you keep track of your
          emotions by dividing them into three different parts- activating event
          (what happened) Beliefs - What did it make you think or believe?
          (Irrational and/or rational?) and consequences - emotions it gave you,
          so that you can sort them instead of let them be there and not knowing
          why.
        </p>
        <p>
          Disclaimer: This is not created by proffessional therapists and is not made 
          for proffessional use. It is created in
          the hope of helping everyone who wants to sort their thoghts and
          emotions out in an easy and effective way.
        </p>
      </Note>

      <Link to="/">Home</Link>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Note = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px 5px 20px;
 
  border: 1px solid black;
  background-color: #efeddb;
`;



export default About;
