import * as React from "react";
import { Stack } from "expo-router";
import { FlatList, SafeAreaView } from "react-native";

import { symbolsDB } from "@/symbolsDB";
import SymbolItem from "@/components/SymbolItem";

export default function MainScreen() {
  const [searchText, setSearchText] = React.useState("");
  const filteredSymbols = React.useMemo(() => {
    return symbolsDB
      .slice(0, 500)
      .filter((symbol) =>
        symbol.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [searchText, symbolsDB]);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Symbols Lab 🧪",
          headerSearchBarOptions: {
            onChangeText: (event) => setSearchText(event.nativeEvent.text),
          },
        }}
      />
      <SafeAreaView>
        <FlatList
          data={filteredSymbols}
          renderItem={({ index, item }) => (
            <SymbolItem key={index} symbol={item} />
          )}
          numColumns={9}
          contentContainerStyle={{
            padding: 16,
            gap: 16,
          }}
        />
      </SafeAreaView>
    </>
  );
}
