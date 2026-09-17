import re

with open("src/components/cultisia/SharedChat.tsx", "r", encoding="utf-8") as f:
    content = f.read()

original = """      if (!res.ok || !res.body) throw new Error("Response error");"""

modified = """      if (!res.ok) {
        if (res.status === 402) {
          throw new Error("CREDITS_EMPTY");
        }
        throw new Error("Response error");
      }
      if (!res.body) throw new Error("Response error");"""

content = content.replace(original, modified)

# Now find the catch block to handle CREDITS_EMPTY
catch_original = """    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "DǸsolǸ, une erreur s'est produite lors de la connexion  Cultisia." },
      ]);
    } finally {"""

catch_modified = """    } catch (error: any) {
      console.error(error);
      const errMsg = error.message === "CREDITS_EMPTY" 
        ? "⚡ **CrǸdits ǸpuisǸs !**\\n\\nVous avez utilisǸ tous vos tokens de test. Merci de nous faire un retour sur votre expǸrience pour dǸbloquer la suite !"
        : "DǸsolǸ, une erreur s'est produite lors de la connexion  Cultisia.";
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errMsg },
      ]);
    } finally {"""

content = content.replace(catch_original, catch_modified)

with open("src/components/cultisia/SharedChat.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched SharedChat.tsx")
