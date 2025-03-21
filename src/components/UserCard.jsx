export default function UserFeed(user) {
  const {firstName, lastName , about, skills, age, gender} = user.user;
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user.user.photoUrl} alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" "+lastName}</h2>
          <p>
          {about}
          </p>
          <p>
          {age+" "+gender}
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondery bg-pink-600">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
}
