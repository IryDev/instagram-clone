import createPost from "@/assets/icons/create-post.svg";

const Create = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div>
          <img src={createPost} alt="" />
            <h1>Create New Post</h1>
        </div>
      </div>
    </div>
  );
};

export default Create;
