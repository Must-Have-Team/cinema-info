import React, { Component } from "react";
import Footer from '../Footer'
import './About.css';
import Bohdan from './Photos/Bohdan.jpg';
import Volodymyr from './Photos/Volodymyr.jpg';
import Denys from './Photos/Denys.jpg';
import Kateryna from './Photos/Kateryna.jpg';
import Ihor from './Photos/Ihor.jpg';

class About extends Component {
  render() {
    return (
      <div>
      <div className="wrapper row2">
  <div id="container" className="clear">

 <section className="bg-light" id="team">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
        </div>
        <div className="row">
        <div className="col-md-2">
            <div className="team-member">
              <img className="mx-auto rounded-circle about" src={Volodymyr} alt="Volodymyr"/>
              <h4>Volodymyr Pasternak</h4>
              <p className="text-muted">Future Lead Developer</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <div className="team-member">
              <img className="mx-auto rounded-circle about" src={Bohdan} alt="Bohdan"/>
              <div id="member-description">
              <h4>Bohdan Shuliaka</h4>
              <p className="text-muted">Future Lead Developer</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="team-member">
              <img id="ihor" className="mx-auto rounded-circle about" src={Ihor} alt="Ігор"/>
              <h4>Ihor Mykhaylyuk</h4>
              <p className="text-muted">Mentor</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <div className="team-member">
              <img className="mx-auto rounded-circle about" src={Denys} alt="Denys"/>
              <h4>Denys Palyarush</h4>
              <p className="text-muted">Future Lead Developer</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <div className="team-member">
              <img className="mx-auto rounded-circle about" src={Kateryna} alt="Kateryna"/>
              <h4>Kateryna Pynka</h4>
              <p className="text-muted">Future Lead Developer</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>
      <Footer />
      </div>
    );
  }
}

export default About;