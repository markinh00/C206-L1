package json_placeholder;

import com.intuit.karate.junit5.Karate;

class JsonRunner {
    @Karate.Test
    Karate testPokemon() {
        return Karate.run("JSONPlaceholder").relativeTo(getClass());
    }     
}
