import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { getTopics } from "../utils/Api";

const Navbar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(data => {
      setTopics(data);
    });
  }, []);

  return (
    <>
      <nav>
        <ul className="flex-row">
          {topics.map(eachTopic => {
            return (
              <Link to={`topics/${eachTopic.slug}`} key={eachTopic.slug}>
                <li>{eachTopic.slug}</li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
