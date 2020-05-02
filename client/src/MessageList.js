import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
{
  posts {
    id
    likes
  }
}
`;

const subscription = gql`
subscription {
  postLikesSubscribe {
    id
    likes
  }
}
`;

const MessageItem = ({ message }) => (
  <li style={{ borderTop: '1px solid lightgray' }}>
    <p>
      {message.likes}
    </p>
  </li>
);

const MessageListView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    //console.log("data", data)
    return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
      {data.posts.map(message => <MessageItem key={message.id} message={message} />)}
      </ul>
    );
  }
};

const MessageList = () => (
  <Query query={query}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const more = () => subscribeToMore({
        document: subscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log("subscriptionData.data.postLikesSubscribe", subscriptionData.data.postLikesSubscribe)
          console.log("prev.posts", prev.posts)
          return Object.assign({}, prev, {
            posts: [subscriptionData.data.postLikesSubscribe, ...prev.posts].slice(0, 20),
          });
        },
      });
      return <MessageListView data={data} subscribeToMore={more}/>;
    }}
  </Query>
);

export default MessageList;
