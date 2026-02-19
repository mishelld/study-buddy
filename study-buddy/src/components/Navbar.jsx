import { IconBrandMessenger } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { useState } from "react";
import { Burger, Container, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSimple.module.css";
import "./Navbar.css";
const links = [
  { link: "/tasks", label: "Tasks" },
  { link: "/Schedue", label: "Schedule" },
];

function Navbar() {
  const { handleLogout } = useContext(AuthContext);

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={`${classes.header} navbar`}>
      <Container size="md" className={`${classes.inner}`}>
        <IconBrandMessenger size={28} />
        <Group gap={5} visibleFrom="xs">
          {items}
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>
    </header>
  );
}
export default Navbar;
