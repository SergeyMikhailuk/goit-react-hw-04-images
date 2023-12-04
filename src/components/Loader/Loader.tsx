import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={'LoaderWrapper'}>
      <Audio height="80" width="80" color="green" ariaLabel="three-dots-loading" />
    </div>
  );
};

export default Loader;
