package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column
    @Setter
    @Getter
    private String fistname;

    @Column
    @Setter
    @Getter
    private String lastname;

    @Column
    @Setter
    @Getter
    private String birday;


    @Column(name="telephone")
    @Setter
    @Getter
    private String telephone;

    @Column
    @Setter
    @Getter
    private String address;

    @Column
    @Setter
    @Getter
    private String location;

    @Column
    @Setter
    @Getter
    private String city;

    @Column
    @Setter
    @Getter
    private String country;


    @Column(name="identity_number")
    @Setter
    @Getter
    private String identity_number;

    @Column(name="identity_type")
    @Setter
    @Getter
    private String identity_type;

    @Column(name="salary",length = 10)
    @Setter
    @Getter
    private Integer salary;

    @Column(name="salary_type")
    @Setter
    @Getter
    private String salary_type;

    @Column(name="contract_start")
    @Setter
    @Getter
    private String contract_end;

    @Column(name="contract_type")
    @Setter
    @Getter
    private String contract_type;

    @Column(name="position")
    @Setter
    @Getter
    private String position;

    @Column(name="transport_costs")
    @Setter
    @Getter
    private String transport_costs;

}

