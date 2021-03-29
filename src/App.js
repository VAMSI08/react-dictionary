import { Container, Switch, withStyles, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import Definitions from "./components/Definitions/Definitions";
import Header from "./components/Header/Header";

const App = () => {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [LightTheme, setLightTheme] = useState(false);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);

  const PurpleSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div
      style={{
        backgroundColor: LightTheme ? "#fff" : "#282c34",
        color: LightTheme ? "#8B8989" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          overflow: "hidden"
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <Typography>
            {LightTheme ? "Light" : "Dark"} Mode{" "}
            <PurpleSwitch
              checked={LightTheme}
              onChange={() => setLightTheme(!LightTheme)}
            />
          </Typography>
        </div>
        <Header
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          word={word}
          setMeanings={setMeanings}
          LightTheme={LightTheme}
        />
        {meanings && (
          <Definitions
            meanings={meanings}
            word={word}
            LightTheme={LightTheme}
            category={category}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
