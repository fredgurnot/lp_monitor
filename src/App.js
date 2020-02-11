import React, {useState, useEffect} from 'react';
import Campaign from './Campaign';
import './App.css';


const App = () => {

  const [campaignsList, setCampaignsList] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterArea, setFilterArea] = useState('');

  const areas = ['barOne', 'inlineUnit', 'welcomeAd', 'dock', 'gateway', 'truncator', 'mobileTruncator'];

  useEffect(() => {
        fetch('https://mwcm-pub.prd.nytimes.com/.rest/mkt/mu/v1')
            .then(response => response.json())
            .then(data => setCampaignsList(data.messagingUnits))
            .catch(error => ({error}));

      }, [filterName]
  );

  return (
      <div className="app">
        <div className="app-container">

          <table className="app-header">

            <thead>
            <tr>
              <th>Priority</th>
              <th>Campaign Name<br/>
                Filter
                <input value={filterName} onChange={(e) => setFilterName(e.target.value)}/>
              </th>
              <th>Variant</th>
              <th>Audiences</th>
              <th>Areas</th>
            </tr>
            </thead>
            <tbody>
            {
              campaignsList.map((campaign, i) => {
                if (campaign.properties.campaignName.includes(filterName)) {
                  return (
                      <Campaign
                          key={i}
                          priority={i + 1}
                          name={campaign.properties.campaignName}
                          variant={campaign.name}
                          segments={campaign.segments}
                          areas={campaign.areas}
                      />
                  )
                } else {
                  return null;
                }

              })

            }
            </tbody>
          </table>

          {/*<div className="filter-areas">*/}
          {/*    <div>*/}
          {/*        {areas.map((label, i) => (<div><Checkbox key={ label } label={label}/></div>))}*/}

          {/*    </div>*/}
          {/*</div>*/}
        </div>
      </div>
  );
};

export default App;
