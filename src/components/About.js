import React from 'react';

const About = () => {
  return (
    <section className="content-section bg-light" id="about">
      <div className="container px-4 px-lg-5 text-center">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-lg-10">
            <div className="fade-in">
              <p className="lead">
                <strong>KAIA</strong> is a five-member Filipina girl group consisting of Angela, Charice, Alexa, Sophia, and Charlotte.
              </p>
            </div>
            
            <div className="slide-in-left">
              <p className="lead">
                The group name draws inspiration from the Cebuano word "kinaiya" reflecting inner character and individuality. 
                It also resonates with the Filipino term "kaya" which symbolizes capability and courage. Coupled with their 
                dragonfly-inspired logo, embodying beauty, strength, and subtle allure, KAIA is dedicated to unveiling their 
                skill, uniqueness, and resolute determination through their music and performance. As they embark on the path 
                to becoming successful artists, they are committed to transforming their dreams into reality.
              </p>
            </div>
            
            <div className="fade-in">
              <p className="lead">
                They released a pre-debut single "KAYA" on December 10, 2021. They officially debuted on April 8, 2022 with 
                "Blah Blah" followed up with digital singles "Dalawa", "TURN UP", and "5678". The group recently released 
                their newest single, YOU DID IT, on April 12, 2024.
              </p>
            </div>
            
            <div className="slide-in-left">
              <p className="lead">
                Their fandom is called <strong>ZAIA</strong>, a community that shares in their journey, passion, and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;