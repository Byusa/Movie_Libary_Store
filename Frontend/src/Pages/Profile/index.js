import React from "react";
import { Tag, Avatar, Tabs, Row, Card } from "antd";
import profilePic from '../../assets/Serge.jpeg';
import pic1 from '../../assets/Serge.jpeg';
import pic2 from '../../assets/Serge.jpeg';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Items } = Tabs;
var mapStyle = {
  height: "200px",
  width: "100%",
  backgroundColor: "black"
};
var cardStyle = {
  width: "100%",
  marginBottom: "20px"
};

var avatarStyle = {
  marginTop: "-50px",
  marginBottom: "20px",
  width: "100px",
  height: "100px"
};

function callback(key) {
  console.log(key);
}

const Profile = () => {
    return (
    <div>
        <Row type="flex" justify="center" align="top">
            <div style={mapStyle}>map</div>
        </Row>
        <Row type="flex" justify="center" align="top">
        <Avatar style={avatarStyle} src={profilePic} />
        </Row>
        <Row type="flex" justify="center">
        <h1>Serge</h1>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: "30px" }}>
        <Tag color="cyan">Hagerty Pro</Tag>
        <Tag color="blue">Loves road trips</Tag>
        </Row>
        <Row type="flex" justify="center" align="top">
        <Tabs
            tabBarGutter="0"
            size="small"
            defaultActiveKey="1"
            onChange={callback}
        >
            <Items tab="Stories" key="1">
            <Card
                style={cardStyle}
                cover={<img alt="example" src={pic1} />}
                actions={[
                    <SettingOutlined />,
                    <EditOutlined />,
                    <EllipsisOutlined />,
                ]}
            >
                <Meta
                avatar={<Avatar src={profilePic} />}
                title="Florida"
                description="Palm tree cruise"
                />
            </Card>
            <Card
                style={cardStyle}
                cover={<img alt="example" src={pic2} />}
                actions={[
                    <SettingOutlined />,
                    <EditOutlined />,
                    <EllipsisOutlined />,
                ]}
            >
                <Meta
                avatar={<Avatar src={profilePic} />}
                title="All pages on deck"
                description="Page family trip"
                />
            </Card>
            </Items>
            <Items tab="Past trips">
                Content of Tab Pane 2
            </Items>
            {/* <Items tab="Upcoming" key="3">
            Content of Tab Pane 3
            </Items> */}
        </Tabs>
        </Row>
    </div>
)}

export default Profile;
