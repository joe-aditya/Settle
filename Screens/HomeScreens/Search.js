import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Header,
  SearchBar,
  ListItem,
  Avatar,
  Icon,
  Badge,
  Button,
} from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  onFrnds,
  searchUsers,
  onFrndReq,
  acceptFrndReq,
  giveFrndReq,
} from "../../Redux/Actions/HomeAction";

const Search = (props) => {
  console.log("RENDERING Search");
  const dispatch = useDispatch();

  const searchList = useSelector((state) => state.Home.searchList);
  const frndReqlist = useSelector((state) => state.Home.friendReq);
  const frndlist = useSelector((state) => state.Home.friends);

  useEffect(() => {
    const f = async () => {
      dispatch(onFrndReq());
      dispatch(onFrnds());
    };
    f();
    return () => console.log("CLEANUP Search");
  }, []);

  //  console.log(frndlist);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              iconStyle: { color: "#fff" },
            }}
            centerComponent={{ text: "FRIENDS", style: { color: "#fff" } }}
            // rightComponent={{ icon: "home", color: "#fff" }}
          />

          <SearchBar
            placeholder="Search"
            onChangeText={(text) => {
              setSearch(text);
              dispatch(searchUsers(text));
            }}
            value={search}
          />
          {searchList.length !== 0 ? (
            <View>
              {searchList.map((aUser, index) => (
                <ListItem key={index} bottomDivider>
                  {/* <TouchableHighlight
                style={styles.button}
                onPress={() =>
                  props.navigation.navigate("FriendProfile", {
                    params: { friendkey: aUser[0] },
                  })
                }
              > */}
                  <Avatar
                    source={{
                      uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{aUser[1].username}</ListItem.Title>
                    <ListItem.Subtitle>{index}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Button
                            title="Accept"
                            onPress={() => giveFrndReq(aUser[0])}
                          />
                  {/* </TouchableHighlight> */}
                </ListItem>
              ))}
            </View>
          ) : (
            <View>
              {search == "" ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                >
                  <View>
                    <ListItem.Accordion
                      content={
                        <>
                          <View>
                            <Avatar
                              rounded
                              source={{
                                uri: "https://image.flaticon.com/icons/png/512/1182/1182775.png",
                              }}
                              size="large"
                            />

                            <Badge
                              status="error"
                              containerStyle={{
                                position: "absolute",
                                top: -3,
                                right: -3,
                              }}
                              value={frndReqlist.length}
                            />
                          </View>
                          <ListItem.Content>
                            <ListItem.Title>Friend Requests</ListItem.Title>
                          </ListItem.Content>
                        </>
                      }
                      isExpanded={expanded && frndReqlist.length}
                      onPress={() => {
                        setExpanded(!expanded);
                      }}
                    >
                      {frndReqlist.map((aFrndReq, index) => (
                        <ListItem key={index} bottomDivider>
                          <Avatar
                            source={{
                              uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
                            }}
                          />
                          <ListItem.Content>
                            <ListItem.Title>
                              {aFrndReq[1].username}
                            </ListItem.Title>
                            <ListItem.Subtitle>{index}</ListItem.Subtitle>
                          </ListItem.Content>
                          <ListItem.Chevron />
                          <Button
                            title="Accept"
                            onPress={() => acceptFrndReq(aFrndReq[0])}
                          />
                          <Button title="Delete" type="outline" />
                        </ListItem>
                      ))}
                    </ListItem.Accordion>

                    {frndlist.length !== 0 && (
                      <View>
                        <Text>MY FRIENDS</Text>
                        {frndlist.map((aFrnd, index) => (
                          <ListItem key={index} bottomDivider>
                            {/* <TouchableHighlight
                    style={styles.button}
                    onPress={() =>
                      props.navigation.navigate("FriendProfile", {
                        params: { friendkey: aUser[0] },
                      })
                    }
                    > */}
                            <Avatar
                              source={{
                                uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
                              }}
                            />
                            <ListItem.Content>
                              <ListItem.Title>
                                {aFrnd[1].username}
                              </ListItem.Title>
                              <ListItem.Subtitle>{index}</ListItem.Subtitle>
                            </ListItem.Content>
                            {/* </TouchableHighlight> */}
                          </ListItem>
                        ))}
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                >
                  <View style={styles.nouser}>
                    <Text>No users found</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 30,
    marginLeft: 30,
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderBottomColor: "red",
    borderBottomWidth: 3,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  nouser: {
    height: '100%',
  }
});

export default Search;
