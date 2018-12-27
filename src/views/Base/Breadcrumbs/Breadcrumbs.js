import React, {Component} from 'react';
import {gq, kurslar} from '../../../graphql/queries';

class Breadcrumbs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kurslar: [],
      error:''
    };
  }

  componentDidMount() {
      gq.client().request(kurslar.query(), kurslar.variables(''))
          .then(
              data => {
                  if (data.kurslar) {
                    this.setState({kurslar: data.kurslar});
                  }
              },
          )
          .catch(err => {
              this.setState({error: err.response.errors[0].message});
          });
  }

    render() {
    return (
      <div className="animated fadeIn">
        <ul>
            {this.state.kurslar.map(item =>
                <li key={item.title}>{item.title}</li>
            )}
        </ul>
        <div>
            {this.state.error}
        </div>
      </div>
    );
  }
}

export default Breadcrumbs;
