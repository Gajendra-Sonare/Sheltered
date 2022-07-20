import NavBar from "../components/Navbar";

const Home = () => {
  // return a home page describing the app
  return (
    <div>
      <NavBar />
      <h1 style={{textAlign:"center"}}>Hello, Welcome</h1>
      <p>
        This is the web application creted using <strong>React</strong>. It is a simple web application that allows you to create a advertisements
        of your rooms and flats so that visitors of this website who is looking for rooms and flats in your area can contact you and get more
        information about your property. You can also create your own profile and post your own ads. You can also login and signup to the website.

      </p>
      <p>
        Following technologies is used in this project:
      </p>
      <div>
        <ul>
          <li> <strong>React</strong> - Front end of this project is developed using this Framework</li>
          <li> <strong>Django</strong> - This is used as a backend </li>
          <li> <strong>Postgresql</strong> - For the database</li>
        </ul>

      </div>
    </div>
  );
};

export default Home;


