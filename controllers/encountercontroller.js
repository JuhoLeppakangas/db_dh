/* eslint-disable new-cap */
/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const RandomEncounter = require('../models/RandomEncounter');

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const RandomEncounterController = {
  // 1) Kaikki encounterit
  findAll(req, res) {
    RandomEncounter.find()
      .then((re) => {
        res.json(re);
      })
      .catch((error) => {
        throw error;
      });
  },
  // 2) Yhden encounterin haku id:n perusteella
  findById(req, res) {
    //Mongoose-kantaoperaatio tänne
    //findOne-metodin argumenttina on olio, jossa on hakuehto
    //kannassa olevan id:n (_id) on vastattava pyynnön mukana tulevaan id
    RandomEncounter.findOne({ _id: req.params.id })
      // palautuva promise sisältää yhden opiskelijan
      .then((encounters) => {
        res.json(encounters);
      })
      .catch((error) => {
        throw error;
      });
  },
  // 3) Poistaa encounterin id:n perusteella
  deleteById(req, res) {
    //Mongoose-kantaoperaatio tänne
    //findOneAndDelete-metodin argumenttina on olio, jossa on hakuehto
    //kannassa olevan id:n (_id) on vastattava pyynnön mukana tulevaan id
    RandomEncounter.findOneAndDelete({ _id: req.params.id })
      // palautuva promise sisältää poistettavan opiskelijan
      .then((encounters) => {
        console.log(`Encounter ${req.params.id} deleted`);
        res.json(encounters);
      })
      .catch((error) => {
        throw error;
      });
  },
  // 4) Lisaä uusi encounter
  create(req, res) {
    console.log('Creating new encounter roll table');
    console.log('Request body: ', req.body);
    const newEncounter = RandomEncounter(req.body);
    RandomEncounter.create(newEncounter)
      .then((encountner) => {
        console.log('Encounter created');
        res.json(encountner);
      })
      .catch((error) => {
        throw error;
      });
  },

  // 5) Paivitetaan encounterin id:n perusteella
  updateById(req, res) {
    RandomEncounter.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((encounters) => {
        console.log(`Encounter ${req.params.id} updated`);
        res.json(encounters);
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = RandomEncounterController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:

router.get('/', StudentController.findAll);

jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
