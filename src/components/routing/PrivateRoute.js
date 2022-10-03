import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  let navigate = useNavigate();

  if (loading) 
    return 
      <ThreeCircles
        height='200'
        width='200'
        color='#fabc00'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='three-circles-rotating'
        outerCircleColor=''
        innerCircleColor=''
        middleCircleColor=''
      />;
  if (isAuthenticated) return Component;

  return navigate('/login');
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
