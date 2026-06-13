package com.krishibandhu.security;

import java.security.Key;
import java.util.Date;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

    private static final String SECRET =
            "krishibandhu-secret-key-2026-very-secure-key";

    private static final long EXPIRATION =
            86400000;

    private static final Key KEY =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes());

    public static String generateToken(
            String mobile) {

        return Jwts.builder()
                .subject(mobile)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION))
                .signWith(KEY)
                .compact();
    }

    public static String extractMobile(
            String token) {

        return Jwts.parser()
                .verifyWith(
                        (javax.crypto.SecretKey) KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public static boolean validateToken(
            String token) {

        try {

            Jwts.parser()
                    .verifyWith(
                            (javax.crypto.SecretKey) KEY)
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}