import { IconCheck } from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import image from "./TasksImage.jpg";
import classes from "./HeroBullets.module.css";
import { useNavigate } from "react-router-dom";

function HeroPage() {
  const navigate = useNavigate();
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            StudyMate <br />
          </Title>
          <Text c="dimmed" mt="md">
            StudyMate helps students organize study tasks, monitor progress, and
            stay productive using a Focus Timer and task tracking.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="xl"
            icon={
              <ThemeIcon color="dark" size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              Organize{" "}
              <span className={`${classes.highlight} ${classes.blue}`}>
                tasks
              </span>
            </List.Item>
            <List.Item>
              Track{" "}
              <span className={`${classes.highlight} ${classes.pink}`}>
                progress
              </span>
            </List.Item>
            <List.Item>
              Stay{" "}
              <span className={`${classes.highlight} ${classes.yellow}`}>
                focused
              </span>
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              size="md"
              color="violet"
              className={classes.control}
              onClick={() => navigate("/login")}
            >
              Get started
            </Button>
          </Group>
        </div>
        <Image src={image} className={classes.image} alt="" />
      </div>
    </Container>
  );
}

export default HeroPage;
