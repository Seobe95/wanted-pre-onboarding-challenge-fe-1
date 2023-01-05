import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import Responsive from './Responsive';
import useAuthStore from '../../hooks/auth/useAuthStore';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            WANTED LIST
          </Link>
          <div className="right">
            <Button
              fullWidth={false}
              onClick={() => {
                logout();
                alert('로그아웃 하셨습니다.');
                return navigate('/auth');
              }}
            >
              로그아웃
            </Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
