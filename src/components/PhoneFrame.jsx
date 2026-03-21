import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

const Phone = styled.div`
  position: relative;
  width: 375px;
  height: 700px;
  border-radius: 40px;
  background: #1a1a1a;
  padding: 12px;
  box-shadow:
    0 0 0 2px #333,
    0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 440px) {
    width: 100%;
    max-width: 340px;
    height: 620px;
    border-radius: 32px;
    padding: 10px;
  }
`;

const Notch = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 28px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  z-index: 2;

  @media (max-width: 440px) {
    width: 100px;
    height: 24px;
  }
`;

const Screen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  background: #fff;

  @media (max-width: 440px) {
    border-radius: 22px;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

function PhoneFrame({ url, title }) {
  return (
    <Wrapper>
      <Phone>
        <Notch />
        <Screen>
          <Iframe
            src={url}
            title={title || 'Live demo'}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </Screen>
      </Phone>
    </Wrapper>
  );
}

export default PhoneFrame;
