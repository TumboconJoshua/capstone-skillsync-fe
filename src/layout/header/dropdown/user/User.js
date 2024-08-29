import React, { useState, useEffect } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { useTheme, useThemeUpdate } from "../../../provider/Theme";

const User = () => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const toggle = () => setOpen((prevState) => !prevState);

    const [fullName, setFullName] = useState("");
    useEffect(() => {
        const full_name = localStorage.getItem("fullname");
        const profile = localStorage.getItem("profile");
        const useImage = JSON.parse(localStorage.getItem('contact'));
        // console.log(useImage.profile_picture);+
        if (useImage.profile_picture) {
          
          setProfile(`http://localhost:8000/api`+useImage.profile_picture);
        }

      console.log(profile);

      setFullName(full_name);
        // setProfile(profile);
    });
  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          { !profile ?( <UserAvatar icon="user-alt" className="sm bg-primary" />) : (
            <UserAvatar image={profile} className="sm bg-primary w-2" />
          )}
          <div className="user-info d-none d-md-block">
            <div className="user-name dropdown-indicator">
                {fullName ? fullName : "Guest"}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner">
          <LinkList>
            {
              localStorage.getItem("role") === "Employer" ?
              <a href={`${process.env.PUBLIC_URL}/my-profile`}>
              <Icon name="user"></Icon>
              <span>Profile</span>
            </a> :
            <a href={`${process.env.PUBLIC_URL}/my-profile2`}>
            <Icon name="user"></Icon>
            <span>Profile</span>
          </a>
            }
          </LinkList>
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth`}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
