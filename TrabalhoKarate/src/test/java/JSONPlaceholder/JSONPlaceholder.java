package JSONPlaceholder;

import com.intuit.karate.junit5.Karate;

class JSONPlaceholder {
    @Karate.Test
    Karate testPokemon() {
        return Karate.run("JSONPlaceholder").relativeTo(getClass());
    }  
}
