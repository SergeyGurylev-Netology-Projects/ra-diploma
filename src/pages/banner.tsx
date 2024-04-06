import banner_logo from '../img/banner.jpg';

export default function Banner() {

  return (
    <div className="banner">
      <img src={banner_logo} className="img-fluid" alt="К весне готовы!" />
        <h2 className="banner-header">К весне готовы!</h2>
    </div>
)
}
