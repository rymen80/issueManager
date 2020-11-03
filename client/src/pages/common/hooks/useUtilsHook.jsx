import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useUtils = () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  return {
    history,
    params,
    location,
    dispatch,
  };
};

