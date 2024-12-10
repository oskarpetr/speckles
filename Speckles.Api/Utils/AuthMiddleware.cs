namespace Speckles.Api.Mappings;

public class AuthMiddleware
{
    public static void Authenticate()
    {
        // var handler = new JwtSecurityTokenHandler();
        // Request.Cookies.TryGetValue("next-auth.session-token", out string? authorizationToken);
        //
        // var key = Encoding.ASCII.GetBytes("hIpgKAmTxEkynWKUdINGxEYgsFd/pDoL28ChZCiLifk=");  // Convert the secret key to bytes
        // var decryptionKey = Encoding.ASCII.GetBytes("hIpgKAmTxEkynWKUdINGxEYgsFd/pDoL28ChZCiLifk=");  // Convert the secret key to bytes
        //
        // // Set up the token validation parameters
        // var validationParameters = new TokenValidationParameters()
        // {
        //     ValidateIssuer = false,
        //     ValidateAudience = false,
        //     ValidateLifetime = true,   // Token expiration check
        //     IssuerSigningKey = new SymmetricSecurityKey(key),
        //     TokenDecryptionKey = new SymmetricSecurityKey(decryptionKey),
        //     ClockSkew = TimeSpan.Zero // Optional: to prevent issues with time skew
        // };
        //
        // // Validate the token and get the claims principal
        // var principal = handler.ValidateToken(authorizationToken, validationParameters, out SecurityToken validatedToken);
        //
        // return Ok(principal);
    }
    
    public static void Authorize()
    {
        
    }
}