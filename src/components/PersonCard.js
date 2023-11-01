const PersonCard = (props) => {
  const { user } = props;

  return (
    <div className="personcard">
      <img src={user.avatar} />
      <p>{user["first_name"]}</p>
      <p>{user["last_name"]}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default PersonCard;
