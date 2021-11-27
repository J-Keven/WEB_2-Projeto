import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    font-size: var(--smaller-text);
  }
  .Toastify__progress-bar {
    background: var(--primary-color-200);
  }
`;