import Menu from "../components/utils/Menu";
import profilePhoto from "../components/assets/img/profile_photo.webp";

function Profile() {
  return (
    <>
      <div className="screen">
        <Menu />
        <div className="body">
          <div className="title_container">
            <h2>Profile</h2>
          </div>
          <div className="profile_body">
            {/* Profil bilgileri eklenecek */}
            <div className="profile_item">
              <div className="profile_photo_container">
                <img src={profilePhoto} alt="" className="profile_photo" />
              </div>
              <div className="input_container">
                <div className="input_group_flex">
                  <div className="input_group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" />
                  </div>
                  <div className="input_group">
                    <label htmlFor="position">Position:</label>
                    <select id="position" name="position">
                      <option value="">Select Position</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                    </select>
                  </div>
                </div>
                <div className="input_group_flex">
                  <div className="input_group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                  </div>
                  <div className="input_group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" name="phone" id="phone" />
                  </div>
                </div>
                <div className="input_group_flex">
                  <div className="input_group">
                    <button>Gönder</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
